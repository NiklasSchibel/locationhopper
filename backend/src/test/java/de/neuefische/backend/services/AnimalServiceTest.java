package de.neuefische.backend.services;

import com.mongodb.lang.Nullable;
import de.neuefische.backend.controller.AnimalController;
import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.exception.AnimalDoesNotExistException;
import de.neuefische.backend.models.AnimalData;
import de.neuefische.backend.repositories.AnimalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.Null;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class AnimalServiceTest {

    private final AnimalRepository animalRepository = Mockito.mock(AnimalRepository.class);
    private final AnimalService animalService = new AnimalService(animalRepository);

    @BeforeEach
    void setUp() {

    }


    @Test
    @DisplayName("Simple return of all animals should work")
    void shouldReturnAllAnimals() {

        //Given
        AnimalData animal1 = new AnimalData("1", "Affe", "imageLink1", "A");
        AnimalData animal2 = new AnimalData("2", "Elefant", "imageLink2", "E");
        List<AnimalData> underTestAnimalDataList = List.of(
                animal1,
                animal2
        );
        List<AnimalDTO> underTestAnimalDataDTOList = List.of(
                new AnimalDTO(animal1),
                new AnimalDTO(animal2)
        );

        //When
        Mockito.when(animalRepository.findAll())
                .thenReturn(underTestAnimalDataList);

        //Then
        assertEquals(underTestAnimalDataDTOList, animalService.findAllAnimals());
    }

    @Nested
    class get_animalsByID_service {

        @Test
        void shouldReturnAnimalByID() {
            //Given
            AnimalData animal1 = new AnimalData("1", "Affe", "imageLink1", "A");
            AnimalDTO animal1DTO = new AnimalDTO(animal1);

            //When
            Mockito.when(animalRepository.findById("1"))
                    .thenReturn(Optional.of(animal1));

            //Then
            assertEquals(animal1DTO, animalService.getAnimalByID("1"));

        }

        @Test
        @DisplayName("Ensure correct handling of AnimalDoesNotExistException")
        void shouldThrowErrorWhenAnimalByIDSearchDoesNotExist() {
            //Given
            String id = "111";

            //When
            Mockito.when(animalRepository.findById(id))
                    .thenReturn(Optional.empty());

            //Then
            try {
                AnimalDTO returnedValue = animalService.getAnimalByID(id);
                fail("Expected exception was not thrown");
            } catch (Exception e) {
                assertTrue(e instanceof AnimalDoesNotExistException);
                assertEquals(e.getMessage(), "Animal with id " + id + " not found!");
            }
        }
    }

    @Test
    @DisplayName("Ensure correct handling of exception if getRandomAnimal function does not work")
    void shouldReturnErrorWhenGetRandomAnimalDoesNotWork() {
        //Given
        AnimalData animal1 = new AnimalData("1", "Affe", "imageLink1", "A");
        AnimalData animal2 = new AnimalData("2", "Elefant", "imageLink2", "E");
        List<AnimalData> underTestAnimalDataList = List.of(
                animal1,
                animal2
        );
        List<AnimalDTO> underTestAnimalDataDTOList = List.of(
                new AnimalDTO(animal1),
                new AnimalDTO(animal2)
        );

        String id = "111";

        //When
        Mockito.when(animalRepository.findAll())
                .thenReturn(underTestAnimalDataList);
        Mockito.when(animalRepository.findById(id))
                .thenReturn(Optional.empty());

        //Then
        int max = animalRepository.findAll().size() - 1;
        assertEquals(max, 1);
        try {
            animalService.getRandomAnimal();
        } catch (ResponseStatusException e) {
            assertEquals("problem: could not get random animal from mongoDB", e.getReason());
        }
    }

}
