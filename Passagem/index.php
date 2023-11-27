<?php
session_start();
if ($_SESSION['nome'] == 'admin'):
	header('Location: ../CRUD/crud.php');
endif
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="images/logo.ico">


<title>Passagens XPTO</title>

<link rel="stylesheet" href="css/style.css" />
</head>
<body>

	<div class="models">


		<div class="pass-item">
			<a href="">
				<div class="pass-item--img">
					<img src="" />
				</div>
				<div class="pass-item--add">+</div>
			</a>
			<div class="pass-item--price">R$ --</div>
			<div class="pass-item--name">--</div>
			<div class="pass-item--desc">--</div>
		</div>


		<div class="cart--item">
			<img src="" />
			<div class="cart--item-nome">--</div>
			<div class="cart--item--qtarea">
				<button class="cart--item-qtmenos">-</button>
				<div class="cart--item--qt">1</div>
				<button class="cart--item-qtmais">+</button>
			</div>
		</div>

	</div>

	<header>
		<h1>Passagens XPTO - Olá <?php echo $_SESSION['nome'];?></h1>
		<div class="menu-openner">
			<a href="../logout.php">Sair</a>
		</div>
		<div class="menu-openner">
			<span>0</span>🛒
		</div>
	</header>

	<main>

		<h2>Passagens disponíveis</h2>

		<div class="pass-area"></div>
	</main>

	<aside>
		<div class="cart--area">
			<div class="menu-closer">❌</div>
			<h1>Suas Passagens</h1>
			<div class="cart"></div>
			<div class="cart--details">
				<div class="cart--totalitem subtotal">
					<span>Subtotal</span> <span>R$ --</span>
				</div>
				<div class="cart--totalitem desconto">
					<span>Desconto</span> <span>R$ --</span>
				</div>
				<div class="cart--totalitem total big">
					<span>Total</span> <span>R$ --</span>
				</div>
				<a href="pag.html"><div class="cart--finalizar">Finalizar
						a compra</div></a>

			</div>
		</div>
	</aside>

	<div class="passWindowArea">
		<div class="passWindowBody">
			<div class="passInfo--cancelMobileButton">Voltar</div>
			<div class="passBig">
				<img src="" />
			</div>
			<div class="passInfo">
				<h1>--</h1>
				<div class="passInfo--desc">--</div>
				<div class="passInfo--sizearea">
					<div class="passInfo--sector">Classes</div>
					<div class="passInfo--sizes">
						<div data-key="E" class="passInfo--size">
							Econômica <span>--</span>
						</div>
						<div data-key="Ex" class="passInfo--size">
							Executiva <span>--</span>
						</div>
						<div data-key="Pr" class="passInfo--size selected">
							Premiun <span>--</span>
						</div>
					</div>
				</div>
				<div class="passInfo--pricearea">
					<div class="passInfo--sector">Preço</div>
					<div class="passInfo--price">
						<div class="passInfo--actualPrice">R$ --</div>
						<div class="passInfo--qtarea">
							<button class="passInfo--qtmenos">-</button>
							<div class="passInfo--qt">1</div>
							<button class="passInfo--qtmais">+</button>
						</div>
					</div>
				</div>
				<div class="passInfo--addButton">Adicionar ao carrinho</div>
				<div class="passInfo--cancelButton">Cancelar</div>
			</div>
		</div>
	</div>


	<script src="bus.js"></script>
	<script src="js/script.js"></script>
</body>
</html>