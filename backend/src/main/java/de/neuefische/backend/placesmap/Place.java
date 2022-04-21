package de.neuefische.backend.placesmap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("places")
public class Place {

    @Id
    private String id;
    private LocalDateTime creationDate;
    private double lat;
    private double lng;
    private PlaceType placeType;


    public static Place newPlace(LocalDateTime creationDate, double lat, double lng, PlaceType placeType){
        return Place.builder()
                .creationDate(creationDate)
                .lat(lat)
                .lng(lng)
                .placeType(placeType)
                .build();
    }
}