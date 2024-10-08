import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./header.module.scss";
import logo from "../../assets/img/logo/logo-wealthhealth-nobackground.svg";
import Loader from "../../utils/loader/loader";
import { removeToken } from "../../store/slice/tokenSlice";

export default function Header() {
	const [loading, setLoading] = useState(false);
	const token = useSelector((state) => state.token.token);
	const firstname = useSelector((state) => state.user.firstname);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignOut = () => {
		setLoading(true);

		setTimeout(() => {
			dispatch(removeToken());
			navigate("/login");
			setLoading(false);
		}, 1000);
	};

	return (
		<>
			{loading && <Loader />}
			<header className={styles.header}>
				<nav className={styles.nav}>
					<Link className={styles.nav__logo} to="/">
						<img
							className={styles.nav__logo__image}
							src={logo}
							alt="Wealth Health Logo"
						/>
					</Link>
					<h1 className={styles.nav__title}>-- HR-Net --</h1>

					<div className={styles.nav__connect}>
						{token ? (
							<>
								<div className={styles.nav__connect__container__btnView}>
									<i className="fa fa-user-circle firstname"></i>
									<span>{firstname} Spock</span>
								</div>
								<div className={styles.nav__connect__container}>
									<Link
										className={styles.nav__connect__container__btnvList}
										to="/listEmployees"
									>
										<i className="fa-solid fa-list"></i> Liste employés
									</Link>
									<button
										onClick={handleSignOut}
										className={styles.nav__connect__container__logBtn}
									>
										<i className="fa fa-sign-out"></i> Sign Out
									</button>
								</div>
							</>
						) : (
							<Link
								className={styles.nav__connect__container__logBtn}
								to="/login"
							>
								<i className="fa fa-user-circle"></i> Sign In
							</Link>
						)}
					</div>
				</nav>
			</header>
		</>
	);
}
