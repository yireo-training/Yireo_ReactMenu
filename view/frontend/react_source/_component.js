if (document.getElementById('react-navigation')) {
    const element = document.getElementById('react-navigation');
    const Menu = React.lazy(() => import('Menu'));
    ReactDOM.render(<React.Suspense fallback={<ul dangerouslySetInnerHTML={{__html: element.innerHTML}}/>}>
        <ul><Menu originalContent={element.innerHTML} /></ul>
    </React.Suspense>, element);
}

