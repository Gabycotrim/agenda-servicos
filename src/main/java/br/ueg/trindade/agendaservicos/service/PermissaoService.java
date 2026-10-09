package br.ueg.trindade.agendaservicos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.agendaservicos.model.Permissao;
import br.ueg.trindade.agendaservicos.repository.PermissaoRepository;
import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao permissaoAtualizada) {

        Permissao permissao = permissaoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Permissão não encontrada"));

        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());

        return permissaoRepository.save(permissao);
    }

    public void excluir(Long id) {
        permissaoRepository.deleteById(id);
    }
}