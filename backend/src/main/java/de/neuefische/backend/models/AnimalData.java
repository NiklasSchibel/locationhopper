package de.neuefische.backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Animals")
public class AnimalData {

    @NonNull
    @Id
    private String id;

    private String deName;
    private String imageLink;
    private String startingLetter;
}
