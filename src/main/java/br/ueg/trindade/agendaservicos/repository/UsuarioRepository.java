package br.ueg.trindade.agendaservicos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.agendaservicos.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}