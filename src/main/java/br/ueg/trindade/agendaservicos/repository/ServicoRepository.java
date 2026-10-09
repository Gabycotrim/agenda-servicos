
package br.ueg.trindade.agendaservicos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.agendaservicos.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
}
