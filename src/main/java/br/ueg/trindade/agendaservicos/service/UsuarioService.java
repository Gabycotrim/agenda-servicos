package br.ueg.trindade.agendaservicos.service;

import java.util.List;
import java.util.HashSet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;


import br.ueg.trindade.agendaservicos.model.Usuario;
import br.ueg.trindade.agendaservicos.repository.UsuarioRepository;
import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.agendaservicos.model.Permissao;
import br.ueg.trindade.agendaservicos.repository.PermissaoRepository;

@Service
public class UsuarioService {

    @Autowired
    private PermissaoRepository permissaoRepository;    
    
    @Autowired
    private UsuarioRepository usuarioRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;
        

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));
    }

    public Usuario criar(Usuario usuario) {

    if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
        throw new IllegalArgumentException("A senha é obrigatória.");
    }

    usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

    return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());
        if (usuarioAtualizado.getSenha() != null
        && !usuarioAtualizado.getSenha().isBlank()) {
        usuario.setSenha(passwordEncoder.encode(usuarioAtualizado.getSenha()));}

        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public Usuario atribuirPermissoes(Long usuarioId, List<Long> idsPermissoes) {

    Usuario usuario = buscarPorId(usuarioId);

    HashSet<Permissao> permissoes = new HashSet<>(
            permissaoRepository.findAllById(idsPermissoes)
    );

    usuario.setPermissoes(permissoes);

    return usuarioRepository.save(usuario);
    }
    
}