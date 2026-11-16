package br.ueg.trindade.agendaservicos.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.agendaservicos.model.Usuario;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);

    @Query("""
    SELECT COUNT(u) > 0
    FROM Usuario u
    JOIN u.permissoes p
    WHERE u.username = :username
    AND p.nome = :nomePermissao
    """)

    boolean possuiPermissao(
        @Param("username") String username,
        @Param("nomePermissao") String nomePermissao);

}