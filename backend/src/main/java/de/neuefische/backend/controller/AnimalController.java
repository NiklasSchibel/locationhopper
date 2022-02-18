package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AnimalDTO;
import de.neuefische.backend.services.AnimalService;
import org.springframework.web.bind.annotation.*;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import java.util.List;


@RestController
@RequestMapping("/api/animals")
public class AnimalController {
    private static final Log LOG  = LogFactory.getLog(AnimalController.class);
    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }


    @GetMapping(path = "/")
    @ResponseBody
    public List<AnimalDTO> getAllAnimals() {
        LOG.info("get all animals from mongoDB");
        return animalService.findAllAnimals();
    }

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



