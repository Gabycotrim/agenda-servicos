
package br.ueg.trindade.agendaservicos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.agendaservicos.model.Agendamento;
import br.ueg.trindade.agendaservicos.model.ItemAgendamento;
import br.ueg.trindade.agendaservicos.repository.ItemAgendamentoRepository;


@Service
public class ItemAgendamentoService {

    @Autowired
    private ItemAgendamentoRepository itemAgendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoService;

    public List<ItemAgendamento> listarTodos() {
        return itemAgendamentoRepository.findAll();
    }

    public ItemAgendamento buscarPorId(Long id) {
        return itemAgendamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Item de agendamento não encontrado"));
    }

    public List<ItemAgendamento> listarPorAgendamento(Long agendamentoId) {
        return itemAgendamentoRepository.findByAgendamento_Id(agendamentoId);
    }

    public Agendamento adicionar(
        Long agendamentoId,
        Long servicoId,
        String username) {

    return agendamentoService.adicionarItem(
            agendamentoId, servicoId, username);
    }

    public ItemAgendamento atualizar(
        Long itemId,
        Long servicoId,
        String username) {

    return agendamentoService.atualizarItem(
            itemId, servicoId, username);
    }

    public void excluir(Long itemId, String username) {

    agendamentoService.removerItem(itemId, username);
    }

}
