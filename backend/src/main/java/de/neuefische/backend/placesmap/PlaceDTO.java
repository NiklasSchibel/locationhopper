package de.neuefische.backend.placesmap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDTO {

    private double lat;
    private double lng;
    private PlaceType placeType;
}