<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="logo.ico">
<title>CRUD</title>
<link rel="stylesheet" href="style.css">
<link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css'
	rel='stylesheet'>
</head>

<body>
	<div class="container">
		<div class="header">
			<h2>Olá <?php echo $_SESSION['nome'];?></h2>
			<span>Cadastro de passagens</span>
			<button onclick="openModal()" id="new">
				Incluir</i>
			</button>
			<button id="new">
				<a href="../logout.php">Sair</a>
			</button>
		</div>

		<div class="divTable">
			<table>
				<thead>
					<tr>
						<th>Viagem</th>
						<th>data</th>
						<th>Salário</th>
						<th class="acao">Editar</th>
						<th class="acao">Excluir</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>

		<div class="modal-container">
			<div class="modal">
				<form>
					<label for="m-Viagem">Viagem</label> <input id="m-Viagem"
						type="text" required /> <label for="m-data">data</label> <input
						id="m-data" type="text" required /> <label for="m-valor">Valor</label>
					<input id="m-valor" type="number" required />
					<button id="btnSalvar">Salvar</button>
				</form>
			</div>
		</div>

	</div>
	<script src="crud.js"></script>
</body>

</html>