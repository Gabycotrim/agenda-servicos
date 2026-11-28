
package br.ueg.trindade.agendaservicos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.agendaservicos.model.Agendamento;
import br.ueg.trindade.agendaservicos.service.AgendamentoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Agendamento buscarPorId(@PathVariable Long id) {
        return agendamentoService.buscarPorId(id);
    }

    @PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Agendamento criar(
            @RequestBody Agendamento agendamento,
            Authentication authentication) {

        return agendamentoService.criar(
                agendamento,
                authentication.getName()
        );
    }

    @PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
    @PutMapping("/{id}")
    public Agendamento atualizar(
            @PathVariable Long id,
            @RequestBody Agendamento agendamento,
            Authentication authentication) {

        return agendamentoService.atualizar(
                id,
                agendamento,
                authentication.getName()
        );
    }

    @PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
    @DeleteMapping("/{id}")
    public Agendamento cancelar(
            @PathVariable Long id,
            Authentication authentication) {

        return agendamentoService.cancelar(
                id,
                authentication.getName()
        );
    }
}
