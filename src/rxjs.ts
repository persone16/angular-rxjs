import { debounceTime, distinctUntilChanged, fromEvent, Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'

// #1 case 
// const search$ = new Observable<Event>(observer => {
// 	console.log('Start in Observable');
	
// 	const search = document.getElementById("search");

// 	if(!search) {
// 		observer.error('Element does not exist');
// 		return;
// 	}
	
// 	search.addEventListener("input", event => {
// 		observer.next(event);
// 		// observer.complete();
// 	})

// 	console.log('End in Observable');
// });

// #2 case 
const input = document.getElementById('search');
const el1: HTMLElement = input as HTMLElement;
const search$: Observable<Event> = fromEvent<Event>(
	el1, 'input'
);

search$
	.pipe(
		map(event => {
			return (event.target as HTMLInputElement).value
		}),
		debounceTime(500),
		map(value => value.length > 3 ? value : ''),
		distinctUntilChanged()
	)
	.subscribe(value => {
		console.log(value);
	});

// search$.subscribe({
// 	next: value => {
// 		console.log(value);
// 	},
// 	error: err => {
// 		console.log(err);
// 	},
// 	complete: () => {
// 		console.log('event end');
// 	}
// });