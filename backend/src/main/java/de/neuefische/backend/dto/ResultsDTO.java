package de.neuefische.backend.dto;

import de.neuefische.backend.models.ResultsData;
import lombok.Data;

import java.util.HashMap;

@Data
public class ResultsDTO {

    private String id;
    private HashMap<String, Integer> lettersCount;



    public ResultsDTO(ResultsData resultsData) {
        super();
        this.id = resultsData.getId();
        this.lettersCount = resultsData.getLettersCount();
    }

}
