package br.ueg.trindade.agendaservicos.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ueg.trindade.agendaservicos.model.Usuario;
import br.ueg.trindade.agendaservicos.repository.UsuarioRepository;
import br.ueg.trindade.agendaservicos.security.JwtUtil;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResposta autenticar(String username, String senha) {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Usuário ou senha inválidos"));

        if (usuario.getSenha() == null || !passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("Usuário ou senha inválidos");
        }

        String token = jwtUtil.gerarToken(usuario);

        List<String> permissoes = usuario.getPermissoes()
                .stream()
                .map(permissao -> permissao.getNome())
                .toList();

        return new LoginResposta(
                token,
                usuario.getNome(),
                permissoes
        );
    }

    public record LoginResposta(
            String token,
            String nome,
            List<String> permissoes) {
    }
}