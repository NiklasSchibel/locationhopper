package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.models.AnimalData;
import de.neuefische.backend.services.AnimalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.HttpServerErrorException;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AnimalControllerTest {

    private MockMvc mockMvc;
    private AnimalService animalService;


    @BeforeEach
    void setUp() {
        animalService = Mockito.mock(AnimalService.class);
        var controller = new AnimalController(animalService);

        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Nested
    class get_animals {

        @Test
        void shouldReturnAllAnimals() throws Exception {
            Mockito.when(animalService.findAllAnimals())
                    .thenReturn(asList(new AnimalDTO(new AnimalData("1", "Affe", "test_link", "A"))
                            , new AnimalDTO(new AnimalData("2", "Elefant", "testlink2", "E"))
                            , new AnimalDTO(new AnimalData("3", "Maus", "testlink3", "M"))));

            mockMvc.perform(
                            get("/api/animals/")
                    ).andExpectAll(
                            status().isOk(),
                            content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.size()").value(3))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.[0].id").value("1"))
            ;

        }

        @Test
        public void shouldTurnErrorIntoBadRequest() throws Exception {
            Mockito.when(animalService.findAllAnimals())
                    .thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));

            mockMvc.perform(
                    get("/api/animals/")
            ).andExpectAll(
                    status().isBadRequest()
            );

        }
    }
}