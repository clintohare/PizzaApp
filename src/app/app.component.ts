import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComboCount } from 'src/models/comboCount';
import { Pizza } from 'src/models/pizza';
import { ToppingsCount } from 'src/models/toppingsCount';
import { PizzaService } from 'src/services/pizza.service';
import {faRocket} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'I Out-pizzad the Hut';
  pizzas: Pizza[];
  toppingsCount: ToppingsCount[];
  comboCount: ComboCount[];
  pizzaCount = 0;
  showToppingHeader = false;
  showComboHeader = false;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
  }

  importPizzas() {
    this.pizzaService.getPizzas().subscribe(data => {
      this.pizzas = data;
      this.pizzaCount = this.pizzas.length;
    });

  }

  getFavoriteToppings() {
    var tempCount = this.pizzaService.countToppings(this.pizzas);

    var sortedList = tempCount.sort((a, b) => b.count - a.count);

    this.toppingsCount = tempCount.slice(0, 10);
    this.showToppingHeader = true;
  }

  getFavoriteCombo() {
    var tempCount = this.pizzaService.countComobos(this.pizzas);

    var sortedList = tempCount.sort((a, b) => b.count - a.count);

    this.comboCount = tempCount.slice(0, 10);
    this.showComboHeader = true;
  }

  closeSection(section: number) {
    if (section == 1) {
      this.showToppingHeader = false;
    }
    else {
      this.showComboHeader = false;
    }
  }
}