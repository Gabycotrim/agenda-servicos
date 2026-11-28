
package br.ueg.trindade.agendaservicos.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.agendaservicos.model.Agendamento;
import br.ueg.trindade.agendaservicos.model.ItemAgendamento;
import br.ueg.trindade.agendaservicos.model.Servico;
import br.ueg.trindade.agendaservicos.model.Usuario;
import br.ueg.trindade.agendaservicos.repository.AgendamentoRepository;
import br.ueg.trindade.agendaservicos.repository.ClienteRepository;
import br.ueg.trindade.agendaservicos.repository.ItemAgendamentoRepository;
import br.ueg.trindade.agendaservicos.repository.ServicoRepository;
import br.ueg.trindade.agendaservicos.repository.UsuarioRepository;


@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ItemAgendamentoRepository itemAgendamentoRepository;

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public Agendamento buscarPorId(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Agendamento não encontrado"));
    }

    @Transactional
    public Agendamento criar(Agendamento agendamento, String username) {

        validarAgendamento(agendamento);

        Usuario responsavel = usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Usuário responsável não encontrado"));

        agendamento.setCliente(
                clienteRepository.findById(agendamento.getCliente().getId())
                        .orElseThrow(() ->
                                new RecursoNaoEncontradoException(
                                        "Cliente não encontrado"))
        );

        agendamento.setUsuarioResponsavel(responsavel);
        agendamento.setStatus("AGENDADO");

        List<ItemAgendamento> itens = new ArrayList<>();

        for (ItemAgendamento itemRecebido : agendamento.getItens()) {

            Servico servico = buscarServico(
                    itemRecebido.getServico().getId());

            ItemAgendamento item = criarItem(agendamento, servico);
            itens.add(item);
        }

        agendamento.setItens(itens);

        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public Agendamento atualizar(
            Long id,
            Agendamento dados,
            String username) {

        Agendamento agendamento = buscarPorId(id);

        verificarResponsavel(agendamento, username);
        verificarAgendamentoAtivo(agendamento);

        validarAgendamento(dados);

        agendamento.setData(dados.getData());
        agendamento.setHorario(dados.getHorario());
        agendamento.setObservacoes(dados.getObservacoes());

        agendamento.setCliente(
                clienteRepository.findById(dados.getCliente().getId())
                        .orElseThrow(() ->
                                new RecursoNaoEncontradoException(
                                        "Cliente não encontrado"))
        );

        agendamento.getItens().clear();

        for (ItemAgendamento itemRecebido : dados.getItens()) {

            Servico servico = buscarServico(
                    itemRecebido.getServico().getId());

            ItemAgendamento item = criarItem(agendamento, servico);

            agendamento.getItens().add(item);
        }

        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public Agendamento cancelar(Long id, String username) {

        Agendamento agendamento = buscarPorId(id);

        verificarResponsavel(agendamento, username);
        verificarAgendamentoAtivo(agendamento);

        agendamento.setStatus("CANCELADO");

        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public Agendamento adicionarItem(
        Long agendamentoId,
        Long servicoId,
        String username) {

    Agendamento agendamento = buscarPorId(agendamentoId);

    verificarResponsavel(agendamento, username);
    verificarAgendamentoAtivo(agendamento);

    Servico servico = buscarServico(servicoId);

    ItemAgendamento item = criarItem(agendamento, servico);

    agendamento.getItens().add(item);

    return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public ItemAgendamento atualizarItem(
        Long itemId,
        Long servicoId,
        String username) {

    ItemAgendamento item = itemAgendamentoRepository.findById(itemId)
            .orElseThrow(() ->
                    new RecursoNaoEncontradoException(
                            "Item de agendamento não encontrado"));

    Agendamento agendamento = item.getAgendamento();

    verificarResponsavel(agendamento, username);
    verificarAgendamentoAtivo(agendamento);

    Servico servico = buscarServico(servicoId);

    item.setServico(servico);
    item.setPreco(servico.getPreco());
    item.setDuracaoMinutos(servico.getDuracaoMinutos());

    return itemAgendamentoRepository.save(item);
    }

    @Transactional
    public void removerItem(Long itemId, String username) {

    ItemAgendamento item = itemAgendamentoRepository.findById(itemId)
            .orElseThrow(() ->
                    new RecursoNaoEncontradoException(
                            "Item de agendamento não encontrado"));

    Agendamento agendamento = item.getAgendamento();

    verificarResponsavel(agendamento, username);
    verificarAgendamentoAtivo(agendamento);

    if (agendamento.getItens().size() <= 1) {
        throw new IllegalArgumentException(
                "O agendamento precisa ter pelo menos um serviço");
    }

    agendamento.getItens().remove(item);

    agendamentoRepository.save(agendamento);
    }

    private ItemAgendamento criarItem(
            Agendamento agendamento,
            Servico servico) {

        ItemAgendamento item = new ItemAgendamento();

        item.setAgendamento(agendamento);
        item.setServico(servico);
        item.setPreco(servico.getPreco());
        item.setDuracaoMinutos(servico.getDuracaoMinutos());

        return item;
    }

    private Servico buscarServico(Long id) {

        return servicoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Serviço não encontrado"));
    }

    private void verificarResponsavel(
            Agendamento agendamento,
            String username) {

        boolean administrador =
                usuarioRepository.possuiPermissao(
                        username, "Administrador");

        if (!administrador &&
            (agendamento.getUsuarioResponsavel() == null ||
                !agendamento.getUsuarioResponsavel()
                    .getUsername().equals(username))) {

            throw new SecurityException(
                    "Você não tem permissão para alterar este agendamento");
        }
    }

    private void verificarAgendamentoAtivo(Agendamento agendamento) {

        if ("CANCELADO".equals(agendamento.getStatus())) {
            throw new IllegalArgumentException(
                    "Este agendamento já foi cancelado");
        }
    }

    private void validarAgendamento(Agendamento agendamento) {

        if (agendamento.getData() == null) {
            throw new IllegalArgumentException(
                    "A data do agendamento é obrigatória");
        }

        if (agendamento.getData().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "A data não pode ser anterior à data atual");
        }

        if (agendamento.getHorario() == null) {
            throw new IllegalArgumentException(
                    "O horário do agendamento é obrigatório");
        }

        if (agendamento.getCliente() == null ||
                agendamento.getCliente().getId() == null) {
            throw new IllegalArgumentException(
                    "Selecione um cliente");
        }

        if (agendamento.getItens() == null ||
                agendamento.getItens().isEmpty()) {
            throw new IllegalArgumentException(
                    "Adicione pelo menos um serviço");
        }

        for (ItemAgendamento item : agendamento.getItens()) {

            if (item == null ||
                    item.getServico() == null ||
                    item.getServico().getId() == null) {

                throw new IllegalArgumentException(
                        "Selecione um serviço válido");
            }
        }
    }
}
