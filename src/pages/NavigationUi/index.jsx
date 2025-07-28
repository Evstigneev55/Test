import { Link } from 'react-router';

import './index.css';

function NavigationUi() {
	return (
		<nav>
			<h1>Choose Lesson Task:</h1>
			<ul className="navigationUi-styles">
				<li>
					<Link to="8">8-th lesson</Link>
				</li>
				<li>
					<Link to="9">9-th lesson</Link>
				</li>
				<li>
					<Link to="10">10-th lesson</Link>
				</li>
				<li>
					<Link to="11">11-th lesson</Link>
				</li>
				<li>
					<Link to="12">12-th lesson</Link>
				</li>
				<li>
					<Link to="13">13-th lesson</Link>
				</li>
				<li>
					<Link to="docReact">
						<b>docReact</b>
					</Link>
				</li>
				<li>
					<Link to="TravelPlan">
						<b>TravelPlan</b>
					</Link>
				</li>
				<li>
					<Link to="docReact_1">
						<i>DocReact_1</i>
					</Link>
				</li>
				<li>
					<Link to="test_1">
						<p>Test_1</p>
					</Link>
				</li>
				<Link to="test_2">
					<p>Test_2</p>
				</Link>
				<Link to="toDo_with_context">
					<p>toDo context</p>
				</Link>
			</ul>
		</nav>
	);
}

export default NavigationUi;
