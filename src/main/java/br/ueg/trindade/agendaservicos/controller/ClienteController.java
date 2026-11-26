
package br.ueg.trindade.agendaservicos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import br.ueg.trindade.agendaservicos.model.Cliente;
import br.ueg.trindade.agendaservicos.service.ClienteService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    @GetMapping("/clientes/{id}")
    public Cliente buscarPorId(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    @PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
    @PostMapping("/clientes")
    public Cliente criar(@RequestBody Cliente cliente) {
        return clienteService.criar(cliente);
    }

    @PreAuthorize("hasAnyRole('Administrador', 'Atendente')")
    @PutMapping("/clientes/{id}")
    public Cliente atualizar(
            @PathVariable Long id,
            @RequestBody Cliente clienteAtualizado) {
        return clienteService.atualizar(id, clienteAtualizado);
    }

    @PreAuthorize("hasRole('Administrador')")
    @DeleteMapping("/clientes/{id}")
    public void excluir(@PathVariable Long id) {
        clienteService.excluir(id);
    }
}
