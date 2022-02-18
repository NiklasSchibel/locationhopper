package de.neuefische.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Results")
public class ResultsData {

    @NonNull
    @Id
    private String id;

    private HashMap<String, Integer> lettersCount;

    public ResultsData(@NonNull String id) {
        this.id = id;
        HashMap<String, Integer> lettersCountEmpty = new HashMap<>();
        lettersCountEmpty.put("A", 0);
        lettersCountEmpty.put("B", 0);
        lettersCountEmpty.put("C", 0);
        lettersCountEmpty.put("D", 0);
        lettersCountEmpty.put("E", 0);
        lettersCountEmpty.put("F", 0);
        lettersCountEmpty.put("G", 0);
        lettersCountEmpty.put("H", 0);
        lettersCountEmpty.put("I", 0);
        lettersCountEmpty.put("J", 0);
        lettersCountEmpty.put("K", 0);
        lettersCountEmpty.put("L", 0);
        lettersCountEmpty.put("M", 0);
        lettersCountEmpty.put("N", 0);
        lettersCountEmpty.put("O", 0);
        lettersCountEmpty.put("P", 0);
        lettersCountEmpty.put("Q", 0);
        lettersCountEmpty.put("R", 0);
        lettersCountEmpty.put("S", 0);
        lettersCountEmpty.put("T", 0);
        lettersCountEmpty.put("U", 0);
        lettersCountEmpty.put("V", 0);
        lettersCountEmpty.put("W", 0);
        lettersCountEmpty.put("X", 0);
        lettersCountEmpty.put("Y", 0);
        lettersCountEmpty.put("Z", 0);
        this.lettersCount = lettersCountEmpty;

    }
}

