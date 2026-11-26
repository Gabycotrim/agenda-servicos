
package br.ueg.trindade.agendaservicos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.agendaservicos.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
