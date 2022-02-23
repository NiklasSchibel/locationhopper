package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.services.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

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
        } catch (HttpStatusCodeException e) {
            LOG.warn("couldn't find animals in mongoDB ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
//oder vielleicht so und ohne ResponseEntity sondern mit List<AnimalDTO> als Rückgabewert :
//        } catch (Exception e) {
//            LOG.warn("couldn't find animals in mongoDB ");
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "couldn't find animals in mongoDB");

    @GetMapping(path = "/rand")
    @ResponseBody
    public AnimalDTO getRandomAnimal() {
        LOG.info("get one random animal from Database");
        return animalService.getRandomAnimal();
    }


    @GetMapping(path = "/{id}")
    @ResponseBody
    public AnimalDTO getAnimalByIDfromDB(@PathVariable("id") String id) {
        LOG.info("get one animal by id from Database");
        return animalService.getAnimalByID(id);
    }
}



