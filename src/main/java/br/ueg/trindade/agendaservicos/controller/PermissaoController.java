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

import br.ueg.trindade.agendaservicos.model.Permissao;
import br.ueg.trindade.agendaservicos.service.PermissaoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class PermissaoController {

    @Autowired
    private PermissaoService permissaoService;

    @PreAuthorize("hasRole('Administrador')")
    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoService.listarTodos();
    }

    @PreAuthorize("hasRole('Administrador')")
    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoService.buscarPorId(id);
    }

    @PreAuthorize("hasRole('Administrador')")
    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoService.criar(permissao);
    }

    @PreAuthorize("hasRole('Administrador')")
    @PutMapping("/permissoes/{id}")
    public Permissao updatePermissao(
            @PathVariable Long id,
            @RequestBody Permissao permissaoAtualizada) {

        return permissaoService.atualizar(id, permissaoAtualizada);
    }

    @PreAuthorize("hasRole('Administrador')")
    @DeleteMapping("/permissoes/{id}")
    public void deletePermissao(@PathVariable Long id) {
        permissaoService.excluir(id);
    }
}