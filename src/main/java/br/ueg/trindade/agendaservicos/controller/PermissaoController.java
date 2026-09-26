package br.ueg.trindade.agendaservicos.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.agendaservicos.model.Permissao;

@RestController
@RequestMapping("/api")
public class PermissaoController {

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {

        List<Permissao> permissoes = new ArrayList<>();

        permissoes.add(new Permissao(
                1L,
                "Administrador",
                "Acesso total ao sistema"
        ));

        permissoes.add(new Permissao(
                2L,
                "Atendente",
                "Acesso ao gerenciamento de clientes e serviços"
        ));

        return permissoes;
    }
}