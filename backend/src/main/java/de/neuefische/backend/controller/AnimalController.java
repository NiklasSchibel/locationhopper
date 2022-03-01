package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.services.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.List;


@RestController
@RequestMapping("/api/animals")
public class AnimalController {
    private static final Log LOG = LogFactory.getLog(AnimalController.class);
    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }


    @GetMapping(path = "/")
    @ResponseBody
    public ResponseEntity<List<AnimalDTO>> getAllAnimals() {
        try {
            LOG.info("get all animals from mongoDB");
            List<AnimalDTO> response = animalService.findAllAnimals();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOG.warn("couldn't find animals in mongoDB ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(path = "/rand")
    @ResponseBody
    public ResponseEntity<AnimalDTO> getRandomAnimal() {
        try {
            LOG.info("get random animal from mongoDB");
            AnimalDTO response = animalService.getRandomAnimal();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOG.warn("couldn't receive random animal ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<AnimalDTO> getAnimalByIDfromDB(@PathVariable("id") String id) {
        try {
            LOG.info("get one animal by id from Database");
            AnimalDTO response = animalService.getAnimalByID(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOG.warn("couldn't receive animal by id: " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}



