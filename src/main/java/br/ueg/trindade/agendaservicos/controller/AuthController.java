package br.ueg.trindade.agendaservicos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.agendaservicos.service.AuthService;
import br.ueg.trindade.agendaservicos.service.AuthService.LoginResposta;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResposta resposta = authService.autenticar(
                    request.username(),
                    request.senha()
            );

            return ResponseEntity.ok(resposta);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErroResposta("Usuário ou senha inválidos"));
        }
    }

    public record LoginRequest(String username, String senha) {
    }

    public record ErroResposta(String erro) {
    }
}