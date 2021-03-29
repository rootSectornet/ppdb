<script>
/**
 * Profile component
 */
export default {
  computed: {
    matpel() { return this.$store.getters['state/matpel'] }
  },
};
</script>
<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">{{matpel.nama}}</h4>
            </div> 
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Soal</h4>
                        <div class="d-flex flex-wrap  align-items-justify  justify-content-start">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias perspiciatis reprehenderit, ex consequuntur eligendi vitae voluptatibus at? Laboriosam, ullam! Excepturi exercitationem, vitae maxime quisquam quasi eligendi illum est dolor quis!</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias perspiciatis reprehenderit, ex consequuntur eligendi vitae voluptatibus at? Laboriosam, ullam! Excepturi exercitationem, vitae maxime quisquam quasi eligendi illum est dolor quis!</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias perspiciatis reprehenderit, ex consequuntur eligendi vitae voluptatibus at? Laboriosam, ullam! Excepturi exercitationem, vitae maxime quisquam quasi eligendi illum est dolor quis!</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive mt-4">
                        <table class="table table-centered">
                            <tbody>
                            <tr>
                                <td >
                                    <input type="radio" name="CHOICE" id="A">
                                </td>
                                <td>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consequuntur omnis, modi sint quod quia ullam soluta hic recusandae repellat explicabo culpa corrupti delectus magni voluptate, totam laudantium iusto quos!</p>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <input type="radio" name="CHOICE" id="B">
                                </td>
                                <td >
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consequuntur omnis, modi sint quod quia ullam soluta hic recusandae repellat explicabo culpa corrupti delectus magni voluptate, totam laudantium iusto quos!</p>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <input type="radio" name="CHOICE" id="C">
                                </td>
                                <td>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consequuntur omnis, modi sint quod quia ullam soluta hic recusandae repellat explicabo culpa corrupti delectus magni voluptate, totam laudantium iusto quos!</p>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <input type="radio" name="CHOICE" id="D">
                                </td>
                                <td>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consequuntur omnis, modi sint quod quia ullam soluta hic recusandae repellat explicabo culpa corrupti delectus magni voluptate, totam laudantium iusto quos!</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between mb-2">
                    <b-button variant="danger"> <i class="bx bx-chevron-left"></i> Sebelumnya </b-button>
                    <b-button variant="success">Selanjutnya <i class="bx bx-chevron-right"></i></b-button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Nomor</h4>
                        <div class="d-flex flex-wrap  align-items-justify  justify-content-start">
                            <b-button size="sm" pill class="m-2 btn-soal"  v-for="t in 50" :key="t" :variant="t==2?'primary': (t==1) ? 'success' :'outline-primary'" >{{t}}</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- end card -->
</template>