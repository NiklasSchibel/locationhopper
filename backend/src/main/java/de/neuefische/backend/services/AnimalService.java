package de.neuefische.backend.services;

import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.exception.AnimalDoesNotExistException;
import de.neuefische.backend.repositories.AnimalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AnimalService {


    private final AnimalRepository animalRepository;

    Random random = new Random();

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<AnimalDTO> findAllAnimals() {
        return animalRepository.findAll().stream().map(AnimalDTO::new).collect(Collectors.toList());
    }

    public AnimalDTO getAnimalByID(String id) throws AnimalDoesNotExistException {
        return new AnimalDTO(animalRepository.findById(id)
                .orElseThrow(() -> new AnimalDoesNotExistException("Animal with id " + id + " not found!")));
    }

    public AnimalDTO getRandomAnimal() throws ResponseStatusException {
        int min = 1;
        int max = animalRepository.findAll().size() - 1;
        int randomNumber = random.nextInt(max + min) + min; //hier den mock verwenden für random.nextInt
        String searchID = Integer.toString(randomNumber);
        return new AnimalDTO(animalRepository.findById(searchID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "problem: could not get random animal from mongoDB")));
    }
}
