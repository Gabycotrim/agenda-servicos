package br.ueg.trindade.agendaservicos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.agendaservicos.model.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
}