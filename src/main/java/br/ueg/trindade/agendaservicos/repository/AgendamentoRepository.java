package br.ueg.trindade.agendaservicos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.agendaservicos.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}