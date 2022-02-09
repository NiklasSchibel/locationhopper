package de.neuefische.backend.controller;

import de.neuefische.backend.models.AnimalData;
import de.neuefische.backend.services.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }


    @GetMapping(path = "/")
    public ResponseEntity<List<AnimalData>> getAllShoppingListItemsMongo() {
        List<AnimalData> allAnimals = animalService.findAllAnimals();
        return ok(allAnimals);
    }

    @GetMapping(path = "/rand")
    public ResponseEntity<AnimalData> getRandomAnimal() throws Exception {
        Optional<AnimalData> animal = animalService.getRandomAnimal();
        if (animal.isPresent()) {
            return new ResponseEntity<>(animal.get(), HttpStatus.OK);
        } else {
            throw new Exception("random animal could not be found");
        }
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<AnimalData> getAnimalByID(@PathVariable("id") String id) throws Exception {
        Optional<AnimalData> animal = animalService.getAnimalByID(id);
        if (animal.isPresent()) {
            return new ResponseEntity<>(animal.get(), HttpStatus.OK);
        } else {
            throw new Exception("animal ID was not found in MongoDB");
        }
    }
}



