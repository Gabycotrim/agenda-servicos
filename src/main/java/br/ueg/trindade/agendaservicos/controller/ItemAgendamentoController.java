
package br.ueg.trindade.agendaservicos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.ueg.trindade.agendaservicos.model.Agendamento;

import br.ueg.trindade.agendaservicos.model.ItemAgendamento;
import br.ueg.trindade.agendaservicos.service.ItemAgendamentoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/itens-agendamento")
@PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
public class ItemAgendamentoController {

    @Autowired
    private ItemAgendamentoService itemAgendamentoService;

    @GetMapping
    public List<ItemAgendamento> listarTodos() {
        return itemAgendamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ItemAgendamento buscarPorId(@PathVariable Long id) {
        return itemAgendamentoService.buscarPorId(id);
    }

    @GetMapping("/agendamento/{agendamentoId}")
    public List<ItemAgendamento> listarPorAgendamento(
            @PathVariable Long agendamentoId) {

        return itemAgendamentoService.listarPorAgendamento(agendamentoId);
    }

    @PostMapping("/agendamento/{agendamentoId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Agendamento adicionar(
        @PathVariable Long agendamentoId,
        @RequestBody ItemAgendamento item,
        Authentication authentication) {

    return itemAgendamentoService.adicionar(
            agendamentoId,
            item.getServico().getId(),
            authentication.getName());
    }

    @PutMapping("/{id}")
    public ItemAgendamento atualizar(
        @PathVariable Long id,
        @RequestBody ItemAgendamento item,
        Authentication authentication) {

    return itemAgendamentoService.atualizar(
            id,
            item.getServico().getId(),
            authentication.getName());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(
        @PathVariable Long id,
        Authentication authentication) {

    itemAgendamentoService.excluir(
            id,
            authentication.getName());
    }
    
}
