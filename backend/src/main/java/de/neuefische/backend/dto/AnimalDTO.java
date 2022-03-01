package de.neuefische.backend.dto;

import de.neuefische.backend.models.AnimalData;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDTO {

    String id;
    String deName;
    String imageLink;
    String startingLetter;


    public AnimalDTO(AnimalData animalData) {
        this.id = animalData.getId();
        this.deName = animalData.getDeName();
        this.imageLink = animalData.getImageLink();
        this.startingLetter = animalData.getStartingLetter();
    }

}


