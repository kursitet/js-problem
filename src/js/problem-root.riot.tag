<problem-root>
    <p>This is a problem built in Riot.</p>
    <-/>
    <script>
        this.listen('edx_state_updated', state => {
            this.root.innerHTML = JSON.stringify(state);
        });
    </script>
</problem-root>
