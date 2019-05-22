import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterPro"
})
export class FilterPipe implements PipeTransform {
  transform(values: any, term: any, key: string): any {
    // check if search term is undefined
    if (term === undefined || term == "") return values;

    // return updated values array
    if (!this.checkIfNumber(term)) {
      return values.filter(value => value[key] == term);
    }
    return values.filter(
      value => value[key].toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }

  // Check if passing string or number
  private checkIfNumber(term: any): boolean {
    var parsed = parseInt(term, 10);
    if (isNaN(parsed)) {
      return true;
    }
    return false;
  }
}
