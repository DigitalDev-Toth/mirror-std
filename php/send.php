<?php 
if(isset($_REQUEST['recipientEmail'])) {
	echo "ok!";
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
	<style type="text/css">
	body {
		background-color: #454545;
	}
	</style>
</head>
<body>
<div class="container">
	<div class="panel panel-default">
		  <div class="panel-heading">
				<h3 class="panel-title"></h3>
		  </div>
		  <div class="panel-body">
				<form action="" method="POST" role="form" accept-charset="utf-8">
					<div class="form-group">
						<div class="row">
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<label for="">Nombre</label>
								<input type="text" class="form-control" id="recipientName" name="recipientName" placeholder="Nombre">
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<label for="">Correo Electrónico</label>
								<input type="text" class="form-control" id="recipientEmail" name="recipientEmail" placeholder="Correo Electrónico">
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<label for="">Tiempo</label>
								<select name="recipientTime" class="form-control" name="recipientTime" id="recipientTime">
									<option value="60">1 Hora</option>
									<option value="240">4 Horas</option>
									<option value="600">10 horas</option>
									<option value="3600">1 Dia</option>
									<option value="7200">2 Dias</option>
									<option value="14400">4 Dias</option>
									<option value="25200">7 Dias</option>
								</select>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<label for="">Link Descarga</label>
								<div class="checkbox">
									<label>
										<input type="checkbox" id="recipientDownload" name="recipientDownload">
										Enviar Link
									</label>
								</div>
							</div>
						</div>
					</div>
					<button type="submit" class="btn btn-success">Enviar</button>
				</form>
		  </div>
	</div>
</div>
	<script type="text/javascript" src="../js/libs/jquery-1.8.1.min.js"></script>
	<script type="text/javascript" src="../js/libs/bootstrap.min.js"></script>
</body>
</html>