
            <Container maxWidth="xl">
            <Grid container spacing={1} className="mt-1">
                <Grid container>
                    <Grid item xs={12} className="text-left pt-3 pr-3">
                            {proizvod.vrstaRobe === "SSD" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">SSD</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Grafičke karte" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Grafičke karte</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Memorije" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Memorije</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Procesori" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Procesori</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Hard diskovi" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Hard diskovi</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Memorije" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Memorije</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) :
                            proizvod.vrstaRobe === "Napajanja" ? (
                                <span>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Komponente</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Napajanja</Typography></Link>
                                    <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.nazivOpis}</Typography></Link>
                                </Breadcrumbs>
                                </span>
                            ) : (<span></span>)}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} className="text-left pt-3 pr-3">
                        <Typography variant="h4">
                            {proizvod.nazivOpis}
                        </Typography>
                    <Grid container className="mb-0">
                        <Grid item xs={12} className="text-left">
                            <Typography variant="subtitle2">
                                <b>Model</b>: {proizvod.model}
                                <span className="pl-3"><b>EAN</b>: {proizvod.eanKod}</span> 
                                <span className="pl-3"><b>Proizvođač</b>: {proizvod.proizvodjac}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mt-3" justify="center">
                        <Grid item xs={2} className="text-center">
                            {slike.map((slika)=>(
                                <Grid xs={12} className="p-1">
                                    <Paper variant="outlined" squared>
                                        <img src={slika.src} alt={slika.index} key={slika.altText} className={classes.fixedHeight2} onClick={handlePictureChange}/>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={6} className="text-center">
                            <Paper variant="outlined" squared>
                            {selectedSlika === "" ? (
                                <img src={slike[0].src} alt={slike[0].altText} key={slike[0].altText} className={classes.fixedHeight} onClick={handleOpenModal}/>
                            ) : (
                                <img src={selectedSlika.src} alt={selectedSlika.altText} key={selectedSlika.altText} className={classes.fixedHeight} onClick={handleOpenModal}/>
                            )}
                            </Paper>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={6} className="text-left pt-3 pr-3">
                    <Paper variant='outlined' className="p-2" squared>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="h4" className="text-left p-2">
                                            <b>{proizvod.cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</b> RSD
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} className="text-right">
                                    <Typography variant="h6">
                                        {proizvod.recenzije > 0 ? (
                                            <span>Recenzije: ★☆☆☆☆ ({proizvod.recenzije.length})</span>
                                        ) : proizvod.recenzije > 2 ? (
                                            <span>Recenzije: ★★☆☆☆ ({proizvod.recenzije.length})</span>
                                        ) : proizvod.recenzije > 4 ? (
                                            <span>Recenzije: ★★★☆☆ ({proizvod.recenzije.length})</span>
                                        ) : proizvod.recenzije > 6 ? (
                                            <span>Recenzije: ★★★★☆ ({proizvod.recenzije.length})</span>
                                        ) : proizvod.recenzije > 8 ? (
                                            <span>Recenzije: ★★★★★ ({proizvod.recenzije.length})</span>
                                        ) : (<span>★★☆☆☆ ({proizvod.recenzije.length})</span>)}
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className="text-left p-2">{proizvod.naLageru > 0 ? (<span><FiberManualRecordIcon color="primary"/> Na stanju</span>) : (<span><FiberManualRecordIcon color="error"/> Nije na stanju</span>)}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="text-right p-2">Besplatna dostava</div>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" alignItems="center">
                                <Grid item xs={2} className="pb-2 pt-2">
                                    <FormControl variant="outlined" fullWidth>
                                        <TextField margin="dense" defaultValue={1} name="kolicina" id="kolicina" variant="outlined" type="number" onChange={handleKolicinaChange}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} className="pb-2 pt-2 pl-1">
                                    <Button variant="contained" style={{ borderRadius: 0 }} onClick={handleButton} fullWidth>
                                        {imaKorpa ? (<span>Izmeni korpu</span>) : (<span>Dodaj u korpu</span>)}
                                    </Button>
                                </Grid>
                                </Grid>
                        </Paper>
                    <Grid item xs={12} className="text-left pt-3 pr-3">
                    {proizvod.vrstaRobe === "Procesori" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Podnožje</b>: {proizvod.podnozje} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Tip procesora</b>: {proizvod.tipProcesora} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Broj jezgara</b>: {proizvod.brojJezgara} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Threads</b>: {proizvod.niti} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>TDP</b>: {proizvod.tdp} 
                                    </Typography>
                                </span>
                            ) : proizvod.vrstaRobe === "Napajanja" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Izlazna snaga</b>: {proizvod.izlaznaSnaga} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Tip napajanja</b>: {proizvod.tipNapajanja} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Oblik napajanja (Form Factor)</b>: {proizvod.oblikNapajanja} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Efikasnost</b>: {proizvod.efikasnost} 
                                    </Typography>
                                </span>
                            ) : proizvod.vrstaRobe === "Grafičke karte" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Proizvođač čipa</b>: {proizvod.proizvodjac} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Količina memorije</b>: {proizvod.kolicinaMemorije} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Tip memorije</b>: {proizvod.tipMemorije} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Magistrala</b>: {proizvod.magistralaMemorije} 
                                    </Typography>
                                </span>
                            ) : proizvod.vrstaRobe === "Memorije" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Kapacitet memorije</b>: {proizvod.kapacitet} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Tip memorije</b>: {proizvod.tipRam} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Maksimalna frekvencija</b>: {proizvod.maksimalnaFrekvencija} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Latencija</b>: {proizvod.latencija} 
                                    </Typography>
                                </span> 
                            ) : proizvod.vrstaRobe === "Hard diskovi" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Tip</b>: {proizvod.tipHdd} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Format diska</b>: {proizvod.formatDiska} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Konekcija</b>: {proizvod.konekcijaDiska} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Kapacitet diska</b>: {proizvod.kapacitetDiska} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Broj obrtaja</b>: {proizvod.brojObrtaja} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Bafer</b>: {proizvod.bufferDiska} 
                                    </Typography>
                                </span> 
                            ) : proizvod.vrstaRobe === "SSD" ? (
                                <span>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>EAN</b>: {proizvod.eanKod} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Kapacitet diska</b>: {proizvod.kapacitetDiska} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Format diska</b>: {proizvod.formatDiska} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Interfejs</b>: {proizvod.interfejs} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Brzina čitanja</b>: {proizvod.brzinaCitanja} 
                                    </Typography>
                                    <Typography variant="subtitle2" className="text-left">
                                        <b>Debljina</b>: {proizvod.debljina} 
                                    </Typography>
                                </span> 
                            ) : (<span></span>)}
                    </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                </Grid>
                <Hidden smDown>
                <Grid container className="mb-4">
                    <Grid item xs={12} className="text-left pt-3 pr-3 pb-3">
                        <Typography variant="h4">
                            Slični proizvodi
                        </Typography>
                    </Grid>
                    <Grid container>
                        {/*{proizvodi.proizvodi.map(({slike,nazivOpis,cena,recenzije,_id})=>(
                            <Grid item xs={12} md={3} className="p-1">
                                <Paper variant="outlined" className="h-100 p-0" square>
                                    <Link to={`${_id}`}><img src={slike[0]} className={classes.cardImage} alt={_id}/></Link>
                                    {recenzije.length > 0 ? (<Typography variant="h5">☆☆☆☆☆ ({recenzije.length})</Typography>) : (
                                    <CardContent className="pt-0 pb-0 mt-0 mb-0">
                                    <List className="p-0">
                                        <ListItem className="p-0">
                                            <ListItemText className="text-left">
                                                <span>
                                                    <Typography variant="h6" className={classes.inlineTypo}>☆☆☆☆☆ ({recenzije.length})</Typography>
                                                </span>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    </CardContent>
                                    )}
                                    <CardContent className={classes.height120}>
                                        <Link to={`${_id}`} className={classes.noDecorationLink}><List className="pt-0 pb-0 mt-0 mb-0">
                                            <ListItem>
                                                <ListItemText className="text-left">
                                                    {nazivOpis}
                                                </ListItemText>
                                            </ListItem>
                                        </List></Link>
                                    </CardContent>
                                    <CardContent className="pt-0 pb-0 mt-0 mb-0">
                                        <List>
                                            <ListItem className="p-0">
                                                <ListItemText className="text-left">
                                                    <Typography variant="h5">
                                                        <b>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</b> RSD
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ))}*/}
                    </Grid>
                </Grid>
                </Hidden>
                <Grid container>
                    <Grid item xs={12}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Jedan" value={0}/>
                            <Tab label="Dva" value={1}/>
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper variant="outlined" squared>
                            {tabValue === 0 ? 
                            (<span>
                                <Grid container>
                                    <Grid xs={6}>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid xs={6}>
                                        fasfas
                                    </Grid>
                                </Grid>
                            </span>) : 
                            (<span>1</span>)}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>