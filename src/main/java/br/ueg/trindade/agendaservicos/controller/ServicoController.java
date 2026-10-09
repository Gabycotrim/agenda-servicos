
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

import br.ueg.trindade.agendaservicos.model.Servico;
import br.ueg.trindade.agendaservicos.service.ServicoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping("/servicos")
    public List<Servico> listarTodos() {
        return servicoService.listarTodos();
    }

    @GetMapping("/servicos/{id}")
    public Servico buscarPorId(@PathVariable Long id) {
        return servicoService.buscarPorId(id);
    }

    @PostMapping("/servicos")
    public Servico criar(@RequestBody Servico servico) {
        return servicoService.criar(servico);
    }

    @PutMapping("/servicos/{id}")
    public Servico atualizar(
            @PathVariable Long id,
            @RequestBody Servico servicoAtualizado) {
        return servicoService.atualizar(id, servicoAtualizado);
    }

    @DeleteMapping("/servicos/{id}")
    public void excluir(@PathVariable Long id) {
        servicoService.excluir(id);
    }
}
