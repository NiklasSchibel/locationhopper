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
    private String placeName;


    public static Place newPlace(LocalDateTime creationDate, double lat, double lng, PlaceType placeType,String placeName){
        return Place.builder()
                .creationDate(creationDate)
                .lat(lat)
                .lng(lng)
                .placeType(placeType)
                .placeName(placeName)
                .build();
    }
}