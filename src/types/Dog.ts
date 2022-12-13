export interface DogData {
  dogs: Dog[];
}

export interface Dog {
  id: string;
  breed: string;
  displayImage: string;
  images: DogImage[];
  subbreeds: string[];
}

export interface DogImage {
  uri: string;
  id: string;
}
