package br.ueg.trindade.agendaservicos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = {
    UserDetailsServiceAutoConfiguration.class
})
public class AgendaServicosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendaServicosApplication.class, args);
	}

}
