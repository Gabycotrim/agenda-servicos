
package br.ueg.trindade.agendaservicos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.agendaservicos.model.Servico;
import br.ueg.trindade.agendaservicos.repository.ServicoRepository;
import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    public Servico buscarPorId(Long id) {
        return servicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço não encontrado"));
    }

    public Servico criar(Servico servico) {
        validarServico(servico);
        return servicoRepository.save(servico);
    }

    public Servico atualizar(Long id, Servico servicoAtualizado) {
        Servico servico = buscarPorId(id);

        validarServico(servicoAtualizado);

        servico.setNome(servicoAtualizado.getNome());
        servico.setDescricao(servicoAtualizado.getDescricao());
        servico.setPreco(servicoAtualizado.getPreco());
        servico.setDuracaoMinutos(servicoAtualizado.getDuracaoMinutos());

        return servicoRepository.save(servico);
    }

    public void excluir(Long id) {
        buscarPorId(id);
        servicoRepository.deleteById(id);
    }

    private void validarServico(Servico servico) {
        if (servico.getNome() == null || servico.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome do serviço é obrigatório");
        }

        if (servico.getPreco() == null || servico.getPreco() <= 0) {
            throw new IllegalArgumentException("O preço deve ser maior que zero");
        }

        if (servico.getDuracaoMinutos() == null || servico.getDuracaoMinutos() <= 0) {
            throw new IllegalArgumentException("A duração deve ser maior que zero");
        }
    }
}
