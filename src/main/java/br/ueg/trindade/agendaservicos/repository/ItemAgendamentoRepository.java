
package br.ueg.trindade.agendaservicos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.agendaservicos.model.ItemAgendamento;

public interface ItemAgendamentoRepository
        extends JpaRepository<ItemAgendamento, Long> {

    List<ItemAgendamento> findByAgendamento_Id(Long agendamentoId);

    long countByAgendamento_Id(Long agendamentoId);
}
