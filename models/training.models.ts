export class Training {
    _id: string;
    title: string;
    description: string;
    date: Date;
    duration: number;
    coach: string;
    location: string;
  
    constructor(
      _id: string,
      title: string,
      description: string,
      date: Date,
      duration: number,
      coach: string,
      location: string
    ) {
      this._id = _id;
      this.title = title;
      this.description = description;
      this.date = date;
      this.duration = duration;
      this.coach = coach;
      this.location = location;
    }
  }
  