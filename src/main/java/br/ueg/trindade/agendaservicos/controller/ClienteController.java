package br.ueg.trindade.agendaservicos.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.agendaservicos.model.Cliente;

@RestController
@RequestMapping("/api")
public class ClienteController {

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {

        List<Cliente> clientes = new ArrayList<>();

        clientes.add(new Cliente(
                1L,
                "Ana Silva",
                "(62) 99999-1111",
                "ana@example.com"
        ));

        clientes.add(new Cliente(
                2L,
                "Carlos Souza",
                "(62) 98888-2222",
                "carlos@example.com"
        ));

        return clientes;
    }
}