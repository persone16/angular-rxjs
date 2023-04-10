import { debounceTime, distinctUntilChanged, fromEvent, Observable } from "rxjs";
import { map, catchError, takeUntil } from 'rxjs/operators'

// #1 case 
// const search$ = new Observable<Event>(observer => {
// 	console.log('Start in Observable');
	
// 	const search = document.getElementById("search");
// 	const stop = document.getElementById("stop");

// 	if(!search || !stop) {
// 		observer.error('Element does not exist');
// 		return;
// 	}

// 	const onSearch = event => {
// 		checkSubscription();
// 		console.log(1234);
// 		observer.next(event);
// 	}
// 	const onStop = event => {
// 		observer.complete();
// 		clear();
// 	}

// 	search.addEventListener("input", onSearch);
// 	stop.addEventListener("click", onStop)

// 	const checkSubscription = () => {
// 		if (observer.closed) {
// 			clear();
// 		}
// 	}

// 	const clear = () => {
// 		search.removeEventListener('input', onSearch);
// 		search.removeEventListener('click', onStop);
// 	}

// 	console.log('End in Observable');
// });

// #2 case 
const input = document.getElementById('search');
const el1: HTMLElement = input as HTMLElement;
const search$: Observable<Event> = fromEvent<Event>(el1, 'input');

const stop = document.getElementById('stop');
const el2: HTMLElement = stop as HTMLElement;
const stop$: Observable<Event> = fromEvent<Event>(el2, 'click');

// const searchSubscription = 
search$
	.pipe(
		map(event => {
			return (event.target as HTMLInputElement).value
		}),
		debounceTime(500),
		map(value => value.length > 3 ? value : ''),
		distinctUntilChanged(),
		takeUntil(stop$)
	)
	.subscribe(value => {
		console.log(value);
	});

// const stopSubscription = stop$.subscribe(() => {
// 	searchSubscription.unsubscribe();
// 	stopSubscription.unsubscribe();
// });

// setTimeout( () => {
// 	console.log("Unsubscribed!")
// 	searchSubscription.unsubscribe();
// }, 10000)

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