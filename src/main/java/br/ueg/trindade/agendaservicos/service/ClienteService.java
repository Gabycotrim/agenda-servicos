
package br.ueg.trindade.agendaservicos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.agendaservicos.model.Cliente;
import br.ueg.trindade.agendaservicos.repository.ClienteRepository;
import br.ueg.trindade.agendaservicos.exception.RecursoNaoEncontradoException;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado"));
    }

    public Cliente criar(Cliente cliente) {
        validarCliente(cliente);
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = buscarPorId(id);

        validarCliente(clienteAtualizado);

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setTelefone(clienteAtualizado.getTelefone());
        cliente.setEmail(clienteAtualizado.getEmail());

        return clienteRepository.save(cliente);
    }

    public void excluir(Long id) {
        buscarPorId(id);
        clienteRepository.deleteById(id);
    }

    private void validarCliente(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome do cliente é obrigatório");
        }

        if (cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
            throw new IllegalArgumentException("O telefone do cliente é obrigatório");
        }

        if (cliente.getEmail() == null || cliente.getEmail().isBlank()) {
            throw new IllegalArgumentException("O e-mail do cliente é obrigatório");
        }
    }
}
