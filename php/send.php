<?php 
if(isset($_REQUEST['recipientEmail'])) {
	echo "ok!";
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title></title>
</head>
<body>
	<form action="" method="post" accept-charset="utf-8">
		<span>Nombre</span>
		<input type="text" name="recipientName" id="recipientName" value="" placeholder="Name">
		<span>Correo Electronico</span>
		<input type="email" name="recipientEmail" id="recipientEmail" value="" placeholder="Email">
		<span>Tiempo</span>
		<select name="recipientTime" name="recipientTime" id="recipientTime">
			<option value="60">1 Hora</option>
			<option value="240">4 Horas</option>
			<option value="600">10 horas</option>
			<option value="3600">1 Dia</option>
			<option value="7200">2 Dias</option>
			<option value="14400">4 Dias</option>
			<option value="25200">7 Dias</option>
		</select>
		<span>Link descarga</span>
		<input type="checkbox" name="recipientDownload" id="recipientDownload" value="">
		<input type="submit" name="send" value="Enviar!">
	</form>
</body>
</html>