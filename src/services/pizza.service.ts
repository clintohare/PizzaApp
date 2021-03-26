import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboCount } from "src/models/comboCount";
import { Pizza } from 'src/models/pizza';
import { ToppingsCount } from "src/models/toppingsCount";

@Injectable()
export class PizzaService {
    private fileLocation: string;

    public constructor(private http: HttpClient) {
        this.fileLocation = 'http://files.olo.com/pizzas.json';
    }

    public getPizzas(): Observable<Pizza[]> {
        return this.http.get<Pizza[]>("assets/pizzas.json");
    }

    public countToppings(pizzas: Pizza[]): ToppingsCount[] {

        let toppingCount: ToppingsCount[] = [];

        for (let p of pizzas) {
            for (let t of p.toppings) {
                var q = toppingCount.find(x => x.name == t);

                if (q == null) {
                    var y: ToppingsCount = new ToppingsCount();
                    y.name = t;
                    y.count = 1;
                    toppingCount.push(y);
                } else {
                    var y: ToppingsCount = new ToppingsCount();
                    y.name = q.name;
                    y.count = q.count + 1;
                    var ax = toppingCount.indexOf(q);
                    toppingCount.splice(ax, 1);
                    toppingCount.push(y);
                }

            }
        }

        return toppingCount;
    }

    public countComobos(pizzas: Pizza[]): ComboCount[] {
        let comboCount: ComboCount[] = [];

        for (let p of pizzas) {
            var comboString = "";
            var count = 1;
            p.toppings.sort();
            for (let t of p.toppings) {
                if (count == 1) {
                    comboString += t;
                } else {
                    comboString += ", " + t;
                }
                count = count + 1;
            }
            var q = comboCount.find(x => x.combination == comboString);

            if (q == null) {
                var y: ComboCount = new ComboCount();
                y.combination = comboString;
                y.count = 1;
                comboCount.push(y);
            } else {
                var y: ComboCount = new ComboCount();
                y.combination = comboString;
                y.count = q.count + 1;
                var ax = comboCount.indexOf(q);
                comboCount.splice(ax, 1);
                comboCount.push(y);
            }
        }

        return comboCount;

    }
}
