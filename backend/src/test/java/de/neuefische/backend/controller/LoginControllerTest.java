package de.neuefische.backend.controller;

import de.neuefische.backend.models.LoginData;
import de.neuefische.backend.models.UserMongo;
import de.neuefische.backend.repositories.MongoUserRepository;
import de.neuefische.backend.services.MongoUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {

    @LocalServerPort
    private int port;

    @MockBean
    private MongoUserRepository mongoUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final WebClient webTestClient = WebClient.create();


    //Hilfsfunktionen
    private UserMongo setupUser(){
        return UserMongo.builder()
                .username("some-user")
                .password(passwordEncoder.encode("secretPassword"))
                .accountNonExpired(true)
                .rights(List.of((MongoUserDetailsService.AUTHORITY_API_READWRITE)))
                .credentialsNonExpired(true)
                .accountNonLocked(true)
                .enabled(true)
                .build();
    }

    @Test
    void loginContollerTestGetNotNullTokenResponseBodyWithValidCredentials() {
        //Given
        when(mongoUserRepository
                .findByUsername("some-user"))
                .thenReturn(Optional.of(setupUser()));

        LoginData loginData = new LoginData("some-user","secretPassword",15);

        //WHEN
        ResponseEntity<String> login = webTestClient.post()
                .uri("http://localhost:"+port+"/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(loginData)
                .retrieve()
                .toEntity(String.class)
                .block();

        String token = login.getBody();

        //THEN
        assertNotNull(token);
    }


    @Test
    void loginContollerTestGetBadRequestHTTPStatusWithInValidCredentials() {
        //Given
        when(mongoUserRepository
                .findByUsername("some-user"))
                .thenReturn(Optional.of(setupUser()));

        LoginData loginData = new LoginData("some-wrong-user","someWrongPassword",15);

        //WHEN
        ResponseEntity<Error> loginError = webTestClient.post()
                .uri("http://localhost:"+port+"/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(loginData)
                .retrieve()
                .onStatus(httpStatus -> httpStatus.equals(HttpStatus.BAD_REQUEST),
                        clientResponse -> Mono.empty())
                .toEntity(Error.class)
                .block();

        //THEN
        assertThat(loginError.getStatusCode(),is(HttpStatus.BAD_REQUEST));
    }

}

//        //WHEN
//        ResponseEntity<String> getHello = webTestClient.get()
//                .uri("http://localhost:"+port+"/api/jwt")
//                .header("Authorization","Bearer"+ token)
//                .retrieve()
//                .toEntity(String.class)
//                .block();
//        //THEN
//        assertThat(getHello.getStatusCode(),is(HttpStatus.OK));
//        assertThat(getHello.getBody(),is("Darfst du nicht!!!"));